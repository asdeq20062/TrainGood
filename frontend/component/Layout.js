import CheckTokenExpired from './CheckTokenExpired';
import NavBar from './NavBar';

export default function Layout(props) {
    const { children } = props;
    return(
        <div>
            <NavBar/>
            <CheckTokenExpired/>
            {children}
        </div>
    )
}