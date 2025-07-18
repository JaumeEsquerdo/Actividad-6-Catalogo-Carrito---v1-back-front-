export const MenuFilters = ({filters, setFilters}) => {
    return (
        <nav className="Menu-filters">
            {['todos', 'rolls', 'nigiri', 'ramen', 'donburi', 'tempura', 'bebidas'].map((f) => (
                <button
                    key={f}
                    className={`Btn-link ${filters === f ? 'active' : ''}`}
                    onClick={() => setFilters(f)}
                >
                    {f[0].toUpperCase() + f.slice(1)}
                </button>
            ))}
        </nav>
    );
}
