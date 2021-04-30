import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Title({ title, source }) {
    return (
        <div class="flex flex-row justify-between">
            <h1 className="text-white text-3xl font-bold">{title}</h1>
            {
                source ? (
                    <p>
                        <a href="">
                            <FontAwesomeIcon icon={faCode} className="h-7 w-7 text-blue-500 hover:text-blue-600 cursor-pointer" />
                        </a>
                    </p>
                ) : null
            }
        </div>
    );
}