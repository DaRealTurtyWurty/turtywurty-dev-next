export default function BrassLoaderSection() {
    require("./Toolchain.css");

    return (<section className="toolchain-section">
            <p className="toolchain-name">Brass Loader</p>
            <p className="toolchain-description">Brass Loader is the primary tool in the Brass ecosystem as it performs
                the important action of loading a mod into Minecraft.<br/><br/>
                Brass Loader is built on-top of the <a href="https://github.com/McModLauncher/modlauncher"
                                                       target="_blank"
                                                       className="toolchain-href"
                                                       rel="noreferrer">MML</a> framework, which helped us
                to massively speed up the development process with a well-tested foundation.
            </p>
        </section>);
}