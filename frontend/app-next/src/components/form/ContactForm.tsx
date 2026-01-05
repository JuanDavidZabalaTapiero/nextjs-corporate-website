"use client";

import { useState } from "react";

const FLASK_URL = process.env.NEXT_PUBLIC_FLASK_URL;

export default function ContactForm() {
    const [name, setName] = useState("");
    const [cv, setCv] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);
        setSuccess(null);

        if (!name.trim()) {
            setError("El nombre es obligatorio.");
            return;
        }

        if (!cv) {
            setError("Debes adjuntar tu hoja de vida.");
            return;
        }

        if (cv.type !== "application/pdf") {
            setError("La hoja de vida debe ser un archivo PDF.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("name", name);
            formData.append("cv", cv);

            const res = await fetch(`${FLASK_URL}/send-cv`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error("Error al enviar el formulario");
            }

            setSuccess(data.message);

            setName("");
            setCv(null);

        } catch (err: any) {
            setError(err.message || "Error inesperado");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-2xl rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-gray-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Envíanos tu hoja de vida
            </h2>

            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Completa el formulario y adjunta tu CV en formato PDF.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                {/* Nombre */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                        Nombre
                    </label>

                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre completo"
                        disabled={loading}
                        className="mt-2 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                    />
                </div>

                {/* CV */}
                <div>
                    <label
                        htmlFor="cv"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                        Hoja de vida (PDF)
                    </label>

                    <input
                        id="cv"
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setCv(e.target.files?.[0] || null)}
                        disabled={loading}
                        className="mt-2 block w-full text-sm text-zinc-700 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-300"
                    />

                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        Solo archivos PDF. Tamaño máximo recomendado: 5MB.
                    </p>
                </div>

                {/* Mensajes */}
                {error && (
                    <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="rounded-md bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300">
                        {success}
                    </div>
                )}

                {/* Botón */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Enviando..." : "Enviar"}
                    </button>
                </div>
            </form>
        </div>
    );
}
