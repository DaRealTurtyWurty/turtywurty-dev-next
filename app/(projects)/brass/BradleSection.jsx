export default function BradleSection() {
    require("./Toolchain.css");

    return (
        <section className="toolchain-section">
            <p className="toolchain-name">Bradle</p>
            <p className="toolchain-description">Bradle is a crucial part of the Brass ecosystem. Bradle is our tool
                used for downloading, deobfucating, decompiling, mapping, remapping (and much more) of the Minecraft
                code. This is what is used by both Brass Loader and Brass API to provide a Minecraft environment.</p>
        </section>
    );
}