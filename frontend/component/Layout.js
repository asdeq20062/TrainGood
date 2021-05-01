import NavBar from './NavBar';

export default function Layout(props) {
    const { children } = props;
    return(
        <div>
            <NavBar/>
            {children}
        </div>
    )
}