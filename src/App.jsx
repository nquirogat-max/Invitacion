import { useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_afx4r6a";
const TEMPLATE_ID = "template_ztittaj";
const PUBLIC_KEY = "2e5GRN4FUhUKjCncf";

const comidas = [
  "Sushi 🍣",
  "Pizza 🍕",
  "Italiana 🍝",
  "Mexicana 🌮",
  "Parrilla 🥩",
  "Hamburguesas 🍔",
  "Café y postre ☕",
  "Sorpréndeme 🎲",
];

const mensajesNo = [
  "No 🙃",
  "¿Segura? 🤔",
  "Piénsalo bien 😅",
  "Casi me atrapas 😎",
  "No tan rápido 😂",
  "Mejor Sí 😊",
];

function App() {
  const [paso, setPaso] = useState(1);
  const [intentos, setIntentos] = useState(0);
  const [posicionNo, setPosicionNo] = useState({ x: 0, y: 0 });
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [datos, setDatos] = useState({
    fecha: "",
    hora: "",
    comida: "",
    comentario: "",
  });

  const hoy = new Date();
  hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
  const fechaMinima = hoy.toISOString().slice(0, 10);

  const moverNo = () => {
    const limiteX = Math.min(window.innerWidth * 0.22, 170);
    setPosicionNo({
      x: Math.round(Math.random() * limiteX * 2 - limiteX),
      y: Math.round(Math.random() * 150 - 75),
    });
    setIntentos((valor) => valor + 1);
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "";
    const [anio, mes, dia] = fecha.split("-");
    return `${dia}/${mes}/${anio}`;
  };

  const continuarFecha = () => {
    if (!datos.fecha || !datos.hora) {
      alert("Selecciona una fecha y una hora.");
      return;
    }
    setPaso(4);
  };

  const continuarComida = () => {
    if (!datos.comida) {
      alert("Selecciona una opción de comida.");
      return;
    }
    setPaso(5);
  };

  const enviar = async () => {
   window.open(
"https://forms.gle/p4zAP5eJ1TBhoDhG6",
"_blank"
);
 
setPaso(6);
};
          title: "Nueva respuesta a la invitación",
name: "Invitación",
email: "nquirogat@gmail.com",
fecha: formatearFecha(datos.fecha),
hora: datos.hora,
comida: datos.comida,
comentario: datos.comentario || "Sin comentario",
},
{
publicKey: PUBLIC_KEY,
}
      );

      if (respuesta.status !== 200) {
        throw new Error(`EmailJS respondió con estado ${respuesta.status}`);
      }

      setPaso(6);
    } catch (fallo) {
      console.error("Error de EmailJS:", fallo);
      const detalle = fallo?.text || fallo?.message || String(fallo);
      setError(`No se pudo enviar: ${detalle}`);
    } finally {
      setEnviando(false);
    }
  };

  const reiniciar = () => {
    setPaso(1);
    setIntentos(0);
    setPosicionNo({ x: 0, y: 0 });
    setError("");
    setDatos({ fecha: "", hora: "", comida: "", comentario: "" });
  };

  if (paso === 1) {
    return (
      <Pagina>
        <Etiqueta texto="TENGO ALGO QUE PREGUNTARTE" />
        <h1 style={estilos.titulo}>Pregunta importante</h1>
        <p style={estilos.pregunta}>¿Te gustaría salir conmigo?</p>

        <div style={estilos.zonaBotones}>
          <button
            type="button"
            style={{ ...estilos.botonPrincipal, background: "#16a34a" }}
            onClick={() => setPaso(2)}
          >
            Sí 😊
          </button>

          <button
            type="button"
            onMouseEnter={moverNo}
            onTouchStart={moverNo}
            onClick={moverNo}
            style={{
              ...estilos.botonNo,
              transform: `translate(${posicionNo.x}px, ${posicionNo.y}px)`,
            }}
          >
            {mensajesNo[Math.min(intentos, mensajesNo.length - 1)]}
          </button>
        </div>
      </Pagina>
    );
  }

  if (paso === 2) {
    return (
      <Pagina>
        <Etiqueta texto="PASO 1 DE 4" />
        <h1 style={estilos.titulo}>Excelente decisión 🎉</h1>
        <p style={estilos.subtitulo}>Análisis extremadamente serio y completamente imparcial.</p>

        <div style={estilos.compatibilidad}>
          <div style={estilos.compatibilidadTexto}>COMPATIBILIDAD DETECTADA</div>
          <div style={estilos.porcentaje}>99.9%</div>
          <div style={estilos.barraFondo}>
            <div style={estilos.barraLlena} />
          </div>
        </div>

        <button type="button" style={estilos.botonPrincipal} onClick={() => setPaso(3)}>
          Organizar la salida →
        </button>
      </Pagina>
    );
  }

  if (paso === 3) {
    return (
      <Pagina>
        <Etiqueta texto="PASO 2 DE 4" />
        <h1 style={estilos.titulo}>Elige cuándo 📅</h1>
        <p style={estilos.subtitulo}>Selecciona la fecha y la hora que más te acomoden.</p>

        <div style={estilos.formulario}>
          <label style={estilos.label}>Fecha</label>
          <input
            type="date"
            min={fechaMinima}
            value={datos.fecha}
            onChange={(e) => setDatos({ ...datos, fecha: e.target.value })}
            style={estilos.input}
          />

          <label style={estilos.label}>Hora</label>
          <input
            type="time"
            value={datos.hora}
            onChange={(e) => setDatos({ ...datos, hora: e.target.value })}
            style={estilos.input}
          />
        </div>

        <Navegacion volver={() => setPaso(2)} continuar={continuarFecha} />
      </Pagina>
    );
  }

  if (paso === 4) {
    return (
      <Pagina>
        <Etiqueta texto="PASO 3 DE 4" />
        <h1 style={estilos.titulo}>¿Qué te gustaría comer? 🍽️</h1>
        <p style={estilos.subtitulo}>Selecciona una opción.</p>

        <div style={estilos.grilla}>
          {comidas.map((comida) => (
            <button
              type="button"
              key={comida}
              onClick={() => setDatos({ ...datos, comida })}
              style={{
                ...estilos.opcion,
                ...(datos.comida === comida ? estilos.opcionSeleccionada : {}),
              }}
            >
              {comida}
            </button>
          ))}
        </div>

        <Navegacion volver={() => setPaso(3)} continuar={continuarComida} />
      </Pagina>
    );
  }

  if (paso === 5) {
    return (
      <Pagina>
        <Etiqueta texto="PASO 4 DE 4" />
        <h1 style={estilos.titulo}>Revisemos el plan</h1>

        <div style={estilos.resumen}>
          <div><strong>📅 Fecha:</strong> {formatearFecha(datos.fecha)}</div>
          <div><strong>⏰ Hora:</strong> {datos.hora}</div>
          <div><strong>🍽️ Comida:</strong> {datos.comida}</div>
        </div>

        <label style={estilos.label}>Comentario opcional</label>
        <textarea
          rows="4"
          value={datos.comentario}
          onChange={(e) => setDatos({ ...datos, comentario: e.target.value })}
          placeholder="Restricciones alimentarias, preferencia de lugar u otro detalle."
          style={{ ...estilos.input, resize: "vertical" }}
        />

        {error && <p style={estilos.error}>{error}</p>}

        <Navegacion
          volver={() => setPaso(4)}
          continuar={enviar}
          texto={enviando ? "Enviando..." : "Confirmar y enviar 💌"}
          deshabilitado={enviando}
        />
      </Pagina>
    );
  }

  return (
    <Pagina>
      <div style={{ fontSize: 64 }}>🎉</div>
      <h1 style={estilos.titulo}>¡Tenemos una salida!</h1>
      <p style={estilos.subtitulo}>La respuesta fue enviada correctamente a tu correo.</p>
      <div style={estilos.resumen}>
        <div><strong>📅 Fecha:</strong> {formatearFecha(datos.fecha)}</div>
        <div><strong>⏰ Hora:</strong> {datos.hora}</div>
        <div><strong>🍽️ Comida:</strong> {datos.comida}</div>
        {datos.comentario && <div><strong>💬 Comentario:</strong> {datos.comentario}</div>}
      </div>
      <button type="button" style={estilos.botonSecundario} onClick={reiniciar}>
        Comenzar nuevamente
      </button>
    </Pagina>
  );
}

function Pagina({ children }) {
  return (
    <main style={estilos.pagina}>
      <section style={estilos.tarjeta}>{children}</section>
    </main>
  );
}

function Etiqueta({ texto }) {
  return <div style={estilos.etiqueta}>{texto}</div>;
}

function Navegacion({ volver, continuar, texto = "Continuar →", deshabilitado = false }) {
  return (
    <div style={estilos.navegacion}>
      <button type="button" style={estilos.botonSecundario} onClick={volver}>
        ← Volver
      </button>
      <button
        type="button"
        style={{ ...estilos.botonPrincipal, opacity: deshabilitado ? 0.6 : 1 }}
        onClick={continuar}
        disabled={deshabilitado}
      >
        {texto}
      </button>
    </div>
  );
}

const estilos = {
  pagina: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    boxSizing: "border-box",
    background: "linear-gradient(135deg, #c7d2fe, #ddd6fe, #fbcfe8)",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#1f2937",
  },
  tarjeta: {
    width: "100%",
    maxWidth: 620,
    minHeight: 450,
    padding: "40px clamp(22px, 6vw, 42px)",
    boxSizing: "border-box",
    background: "rgba(255,255,255,0.97)",
    borderRadius: 26,
    boxShadow: "0 24px 60px rgba(76,29,149,0.18)",
    textAlign: "center",
    overflow: "hidden",
  },
  etiqueta: {
    display: "inline-block",
    padding: "7px 14px",
    marginBottom: 22,
    color: "#6d28d9",
    background: "#f3e8ff",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 700,
  },
  titulo: {
    margin: "0 0 16px",
    color: "#312e81",
    fontSize: "clamp(30px, 6vw, 44px)",
    lineHeight: 1.18,
  },
  pregunta: {
    margin: "25px auto",
    color: "#374151",
    fontSize: 22,
    fontWeight: 700,
  },
  subtitulo: {
    maxWidth: 500,
    margin: "0 auto 28px",
    color: "#4b5563",
    fontSize: 18,
    lineHeight: 1.5,
  },
  zonaBotones: {
    position: "relative",
    height: 210,
    marginTop: 25,
  },
  botonPrincipal: {
    padding: "14px 24px",
    color: "white",
    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
    border: "none",
    borderRadius: 14,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
  },
  botonSecundario: {
    padding: "12px 20px",
    color: "#4f46e5",
    background: "white",
    border: "2px solid #c7d2fe",
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },
  botonNo: {
    position: "relative",
    marginLeft: 15,
    padding: "14px 24px",
    color: "white",
    background: "#ef4444",
    border: "none",
    borderRadius: 14,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    transition: "transform 0.15s ease",
  },
  compatibilidad: {
    maxWidth: 330,
    margin: "32px auto 30px",
    padding: "26px 24px",
    background: "#f5f3ff",
    borderRadius: 20,
  },
  compatibilidadTexto: {
    marginBottom: 14,
    color: "#6b7280",
    fontSize: 13,
    fontWeight: 700,
    lineHeight: 1.3,
  },
  porcentaje: {
    marginBottom: 20,
    color: "#6d28d9",
    fontSize: "clamp(52px, 10vw, 68px)",
    fontWeight: 800,
    lineHeight: 1,
  },
  barraFondo: {
    height: 12,
    background: "#ddd6fe",
    borderRadius: 999,
    overflow: "hidden",
  },
  barraLlena: {
    width: "99.9%",
    height: "100%",
    background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
  },
  formulario: {
    maxWidth: 420,
    margin: "25px auto",
    textAlign: "left",
  },
  label: {
    display: "block",
    margin: "16px 0 8px",
    color: "#374151",
    textAlign: "left",
    fontWeight: 700,
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    boxSizing: "border-box",
    color: "#1f2937",
    background: "#f9fafb",
    border: "2px solid #e5e7eb",
    borderRadius: 13,
    fontSize: 16,
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  grilla: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
    gap: 12,
    marginTop: 24,
  },
  opcion: {
    minHeight: 76,
    padding: "13px 10px",
    color: "#374151",
    background: "white",
    border: "2px solid #e5e7eb",
    borderRadius: 15,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },
  opcionSeleccionada: {
    color: "#5b21b6",
    background: "#ede9fe",
    border: "2px solid #7c3aed",
  },
  navegacion: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 30,
  },
  resumen: {
    margin: "24px 0",
    padding: 20,
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: 17,
    textAlign: "left",
    lineHeight: 2,
  },
  error: {
    marginTop: 16,
    padding: 12,
    color: "#991b1b",
    background: "#fee2e2",
    borderRadius: 12,
    fontSize: 14,
    lineHeight: 1.5,
  },
};

export default App;
