import './Header.css';

export function Header(props) {

    function filter(search) {
        props.filterBySearch(search);
    }

    return (
        <div className="header-wrapper">
            <input className="search-input" placeholder="Search Products" type="text" onKeyUp={(e) => { filter(e.target.value) }} />
        </div>
    )
}