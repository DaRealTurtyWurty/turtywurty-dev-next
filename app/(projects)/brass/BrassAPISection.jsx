export default function BrassAPISection() {
    require("./Toolchain.css");

    return (<section className="toolchain-section">
        <p className="toolchain-name">Brass API</p>
        <p className="toolchain-description">
            Brass API is the front-facing API that developers using Brass, will be using to develop their mods. Brass
            API simplifies the process of making a mod, as it introduces intuitive features such as a better registry
            system, modules (similar to forge capabilities but allow for built-in syncing).
        </p>
    </section>);
}