import { useState, useEffect } from 'react'
import './FilterBox.css';

export function FilterBox(props) {

    const allFilters = { brands: [], gender: [], category: [] };

    function getRadioGroup(type, filters) {
        return (filters[type].map((filter, i) => (
            <div key={filter} >
                <input type="checkbox" name={filter} value="filterChecks" id={filter} onClick={(e) => handleFilterClick(type, filter, e.target.checked)} />
                <label htmlFor={filter}>{filter}</label>
            </div>
        )));
    }

    function handleFilterClick(type, filterVal, isChecked) {
        if (isChecked) {
            allFilters[type].push(filterVal);
        } else {
            allFilters[type] = allFilters[type].filter(val => val !== filterVal)
        }
        props.addFilter(allFilters);
    }

    const [currentBrand, setBrandFilter] = useState()
    const [currentGender, setGenderFilter] = useState()
    const [currentCategory, setCategoryFilter] = useState()

    const filters = props.filters;

    useEffect(() => {
        if (Object.entries(filters).length) {
            setBrandFilter(getRadioGroup('brands', filters));
            setGenderFilter(getRadioGroup('gender', filters));
            setCategoryFilter(getRadioGroup('category', filters));
        }
        if (props.resetFilters) {
            console.log('call reset');
            document.querySelectorAll("input[value=filterChecks]").forEach((checkbox) => {
                checkbox.checked = false;
            });
        }
    }, [props.filters, props.resetFilters])

    return (<div className="filter-wrapper">
        <h2>FILTERS</h2>
        <h3>BRANDS</h3>
        {currentBrand}
        <h3>CATEGORY</h3>
        {currentCategory}
        <h3>GENDER</h3>
        {currentGender}
    </div>)

}