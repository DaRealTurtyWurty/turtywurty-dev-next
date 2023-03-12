export function Warning(props) {
    const {title, children} = props;
    return (<div className="warning">
        <h2>{title}</h2>
        {children}
    </div>);
}