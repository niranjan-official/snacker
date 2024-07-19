import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ products, setProductList }) => {

    const [search, setSearch] = useState('');

    useEffect(() => {
        const filtered = products.filter(prod => prod.name.toLowerCase().includes(search));
        setProductList(filtered);
    }, [search])
    
    return (
        <div className="flex w-full gap-2">
            <div className="flex w-full bg-dark-100 p-3 rounded-md text-primary shadow">
                <FiSearch size={23} />
                <input
                onChange={(e)=>setSearch(e.target.value.toLowerCase())}
                    type="text"
                    placeholder="Search"
                    className="w-full bg-transparent focus:outline-none focus:ring-0 pl-2 placeholder:text-primary/50"
                />
            </div>
            <button className="p-2 px-3 bg-dark-100 rounded-md shadow">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-adjustments-horizontal size-6 text-primary"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M4 6l8 0" />
                    <path d="M16 6l4 0" />
                    <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M4 12l2 0" />
                    <path d="M10 12l10 0" />
                    <path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M4 18l11 0" />
                    <path d="M19 18l1 0" />
                </svg>
            </button>
        </div>
    );
};

export default SearchBar;
