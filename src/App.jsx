import { useRef, useState } from "react";

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSejHaUEvXkmq3vNRFaA7iPwln_Yoa_wcyTEbnJFhFTAbHO11A/formResponse";

const FIELD_FECHA = "entry.1825252071";
const FIELD_HORA = "entry.1034162459";
const FIELD_COMIDA = "entry.1442532259";
const FIELD_COMENTARIO = "entry.489695332";

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
  const formRef = useRef(null);
  const [paso, setPaso] = useState(1);
  const [intentos, setIntentos] = useState(0);
  const [posicionNo, setPosicionNo] = useState({ x: 0, y: 0 });
  const [enviado, setEnviado] = useState(false);
  const [datos, setDatos] = useState({
    fecha: "",
    hora: "",
    comida: "",
    comentario: "",
  });

  const fechaLocal = new Date();
  fechaLocal.setMinutes(
    fechaLocal.getMinutes() - fechaLocal.getTimezoneOffset()
  );
  const fechaMinima = fechaLocal.toISOString().slice(0, 10);

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

  const enviarRespuesta = () => {
    if (!formRef.current) return;

    formRef.current.submit();
    setEnviado(true);
  };

  const reiniciar = () => {
    setPaso(1);
    setIntentos(0);
    setPosicionNo({ x: 0, y: 0 });
    setEnviado(false);
    setDatos({
      fecha: "",
      hora: "",
      comida: "",
      comentario: "",
    });
  };

  if (enviado) {
    return (
      <Pagina>
        <div style={{ fontSize: 64 }}>🎉</div>
        <h1 style={estilos.titulo}>¡Tenemos una salida!</h1>
        <p style={estilos.subtitulo}>
          La respuesta fue enviada al formulario conectado con Google Sheets.
        </p>

        <Resumen datos={datos} formatearFecha={formatearFecha} />

        <button
          type="button"
          style={estilos.botonSecundario}
          onClick={reiniciar}
        >
          Comenzar nuevamente
        </button>
      </Pagina>
    );
  }

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
        <p style={estilos.subtitulo}>
          Análisis extremadamente serio y completamente imparcial.
        </p>

        <div style={estilos.compatibilidad}>
          <div style={estilos.compatibilidadTexto}>
            COMPATIBILIDAD DETECTADA
          </div>
          <div style={estilos.porcentaje}>99.9%</div>
          <div style={estilos.barraFondo}>
            <div style={estilos.barraLlena} />
          </div>
        </div>

        <button
          type="button"
          style={estilos.botonPrincipal}
          onClick={() => setPaso(3)}
        >
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
        <p style={estilos.subtitulo}>
          Selecciona la fecha y la hora que más te acomoden.
        </p>

        <div style={estilos.formulario}>
          <label style={estilos.label}>Fecha</label>
          <input
            type="date"
            min={fechaMinima}
            value={datos.fecha}
            onChange={(evento) =>
              setDatos({ ...datos, fecha: evento.target.value })
            }
            style={estilos.input}
          />

          <label style={estilos.label}>Hora</label>
          <input
            type="time"
            value={datos.hora}
            onChange={(evento) =>
              setDatos({ ...datos, hora: evento.target.value })
            }
            style={estilos.input}
          />
        </div>

        <Navegacion
          volver={() => setPaso(2)}
          continuar={continuarFecha}
        />
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
                ...(datos.comida === comida
                  ? estilos.opcionSeleccionada
                  : {}),
              }}
            >
              {comida}
            </button>
          ))}
        </div>

        <Navegacion
          volver={() => setPaso(3)}
          continuar={continuarComida}
        />
      </Pagina>
    );
  }

  return (
    <Pagina>
      <Etiqueta texto="PASO 4 DE 4" />
      <h1 style={estilos.titulo}>Revisemos el plan</h1>

      <Resumen datos={datos} formatearFecha={formatearFecha} />

      <label style={estilos.label}>Comentario opcional</label>
      <textarea
        rows="4"
        value={datos.comentario}
        onChange={(evento) =>
          setDatos({ ...datos, comentario: evento.target.value })
        }
        placeholder="Restricciones alimentarias, preferencia de lugar u otro detalle."
        style={{ ...estilos.input, resize: "vertical" }}
      />

      <form
        ref={formRef}
        action={GOOGLE_FORM_ACTION}
        method="POST"
        target="google-form-frame"
        style={{ display: "none" }}
      >
        <input
          type="hidden"
          name={FIELD_FECHA}
          value={datos.fecha}
          readOnly
        />
        <input
          type="hidden"
          name={FIELD_HORA}
          value={datos.hora}
          readOnly
        />
        <input
          type="hidden"
          name={FIELD_COMIDA}
          value={datos.comida}
          readOnly
        />
        <input
          type="hidden"
          name={FIELD_COMENTARIO}
          value={datos.comentario || "Sin comentario"}
          readOnly
        />
      </form>

      <iframe
        title="google-form-frame"
        name="google-form-frame"
        style={{ display: "none" }}
      />

      <Navegacion
        volver={() => setPaso(4)}
        continuar={enviarRespuesta}
        texto="Confirmar y guardar 💌"
      />
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

function Navegacion({ volver, continuar, texto = "Continuar →" }) {
  return (
    <div style={estilos.navegacion}>
      <button
        type="button"
        style={estilos.botonSecundario}
        onClick={volver}
      >
        ← Volver
      </button>

      <button
        type="button"
        style={estilos.botonPrincipal}
        onClick={continuar}
      >
        {texto}
      </button>
    </div>
  );
}

function Resumen({ datos, formatearFecha }) {
  return (
    <div style={estilos.resumen}>
      <div>
        <strong>📅 Fecha:</strong> {formatearFecha(datos.fecha)}
      </div>
      <div>
        <strong>⏰ Hora:</strong> {datos.hora}
      </div>
      <div>
        <strong>🍽️ Comida:</strong> {datos.comida}
      </div>
      {datos.comentario && (
        <div>
          <strong>💬 Comentario:</strong> {datos.comentario}
        </div>
      )}
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
};

export default App;
