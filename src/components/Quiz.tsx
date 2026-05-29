import { useState, useEffect } from 'react';

// Definimos la interfaz TypeScript para nuestros datos
export interface Pregunta {
id: number;
pregunta: string;
opciones: string[];
respuestaCorrecta: string;
}

export default function Quiz({ data }: { data: Pregunta[] }) {
const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
const [indiceActual, setIndiceActual] = useState(0);
const [puntuacion, setPuntuacion] = useState(0);
const [seleccionada, setSeleccionada] = useState<string | null>(null);
const [terminado, setTerminado] = useState(false);

// Lógica para barajar y coger 50 preguntas
const iniciarQuiz = () => {
// Si el JSON tiene menos de 50 (por ahora), coge las que haya. Si tiene 200, coge 50.
const cantidad = Math.min(data.length, 50);
const mezcladas = [...data].sort(() => Math.random() - 0.5).slice(0, cantidad);

setPreguntas(mezcladas);
setIndiceActual(0);
setPuntuacion(0);
setSeleccionada(null);
setTerminado(false);
};

useEffect(() => {
iniciarQuiz();
}, [data]);

if (preguntas.length === 0) return <div className="text-center p-10">Cargando cuestionario...</div>;

const preguntaActual = preguntas[indiceActual];

const manejarClic = (opcion: string) => {
if (seleccionada) return; // Bloquear si ya ha respondido
setSeleccionada(opcion);
if (opcion === preguntaActual.respuestaCorrecta) {
    setPuntuacion((prev) => prev + 1);
}
};

const siguientePregunta = () => {
if (indiceActual + 1 < preguntas.length) {
    setIndiceActual((prev) => prev + 1);
    setSeleccionada(null);
} else {
    setTerminado(true);
}
};

// Pantalla final
if (terminado) {
return (
    <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-xl mx-auto mt-10">
    <h2 className="text-3xl font-bold mb-4">¡Terminaste!</h2>
    <p className="text-xl mb-6">Has acertado <span className="font-bold text-green-600">{puntuacion}</span> de {preguntas.length}</p>
    <button 
        onClick={iniciarQuiz}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
    >
        Volver a intentarlo
    </button>
    </div>
);
}

// Pantalla de juego
return (
<div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
    <div className="mb-4 text-sm text-gray-500 font-semibold flex justify-between">
    <span>Pregunta {indiceActual + 1} de {preguntas.length}</span>
    <span>Aciertos: {puntuacion}</span>
    </div>
    
    <h2 className="text-xl font-bold mb-6 text-gray-800">{preguntaActual.pregunta}</h2>
    
    <div className="space-y-3">
    {preguntaActual.opciones.map((opcion, index) => {
        // Reemplaza la lógica de colorBoton dentro del .map() por esto:
let colorBoton = "bg-slate-50 border-slate-200 text-slate-800 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md";

if (seleccionada) {
  if (opcion === preguntaActual.respuestaCorrecta) {
    colorBoton = "bg-emerald-500 border-emerald-600 text-white shadow-lg scale-[1.02]";
  } else if (opcion === seleccionada) {
    colorBoton = "bg-rose-500 border-rose-600 text-white opacity-90";
  } else {
    colorBoton = "bg-slate-100 border-slate-200 text-slate-400 opacity-50";
  }
}

return (
    <button
        key={index}
        onClick={() => manejarClic(opcion)}
        disabled={seleccionada !== null}
        // Clases mejoradas con bordes, transiciones y escalas
        className={`w-full text-left p-5 rounded-xl border-2 font-medium transition-all duration-200 ease-in-out ${colorBoton}`}
    >
        {opcion}
    </button>
    );
        })}
        </div>

        {seleccionada && (
        <button
            onClick={siguientePregunta}
            className="mt-8 w-full bg-blue-600 text-white p-4 rounded-lg font-bold hover:bg-blue-700 transition"
        >
            Siguiente
        </button>
        )}
    </div>
);
}