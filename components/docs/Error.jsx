export default function ErrorPage({ path }) {
    return (
        <div className="relative container mx-auto bg-gray-900 min-h-screen">
            <h1 className="text-white text-xl text-center py-5">
                Error: Could not load docs!{" "}
                <a className="text-blue-400" href={path || "/docs"}>
                    Reload?
                </a>
            </h1>
        </div>
    );
}
