import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FormPostagem from "../formpostagem/FormPostagem";

function ModalPostagem() {
    return (
        <Popup
            trigger={
                <button className="px-4 py-2 border-white border-solid border-2 rounded">
                    Nova Postagem
                </button>
            }
            modal
            contentStyle={{
                borderRadius: "1rem",
                paddingBottom: "2rem"
            }}
        >
            <FormPostagem />
        </Popup>
    )
}

export default ModalPostagem