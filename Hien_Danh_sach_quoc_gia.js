import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HienDanhSachQuocGia() {
    let [countries, setCountries] = useState([]);
    let [filteredCountries, setFilteredCountries] = useState([]);
    let [searchName, setSearchName] = useState('');
    let [minArea, setMinArea] = useState('');
    let [maxArea, setMaxArea] = useState('');
    let [minPopulation, setMinPopulation] = useState('');
    let [maxPopulation, setMaxPopulation] = useState('');

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all?fields=name,area,population,flags')
            .then(response => {
                setCountries(response.data);
                setFilteredCountries(response.data);
            })}, []);

    useEffect(() => {
        let filtered = countries;

        if (searchName) {
            filtered = filtered.filter(country =>
                country.name.common.toLowerCase().includes(searchName.toLowerCase())
            );
        }

        if (minArea) {
            filtered = filtered.filter(country =>
                country.area >= parseFloat(minArea)
            );
        }

        if (maxArea) {
            filtered = filtered.filter(country =>
                country.area <= parseFloat(maxArea)
            );
        }

        if (minPopulation) {
            filtered = filtered.filter(country =>
                country.population >= parseInt(minPopulation, 10)
            );
        }

        if (maxPopulation) {
            filtered = filtered.filter(country =>
                country.population <= parseInt(maxPopulation, 10)
            );
        }

        setFilteredCountries(filtered);
    }, [searchName, minArea, maxArea, minPopulation, maxPopulation, countries]);

    return (
        <div>
            <h1>Danh sách các quốc gia</h1>
            <div>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên"
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Diện tích từ "
                    value={minArea}
                    onChange={e => setMinArea(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Diện tích đến "
                    value={maxArea}
                    onChange={e => setMaxArea(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Dân số từ"
                    value={minPopulation}
                    onChange={e => setMinPopulation(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Dân số đến"
                    value={maxPopulation}
                    onChange={e => setMaxPopulation(e.target.value)}
                />
            </div>
            <table>
                <thead>
                <tr>
                    <th>Quốc kỳ</th>
                    <th>Tên quốc gia</th>
                    <th>Diện tích</th>
                    <th>Dân số</th>
                </tr>
                </thead>
                <tbody>
                {filteredCountries.map((country, index) => (
                    <tr key={index}>
                        <td style={{ textAlign: 'center' }}>
                            <img src={country.flags.svg} alt={`${country.name.common} flag`} width="50" />
                        </td>
                        <td style={{ textAlign: 'center' }}>{country.name.common}</td>
                        <td style={{ textAlign: 'center' }}>{country.area}</td>
                        <td style={{ textAlign: 'center' }}>{country.population}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default HienDanhSachQuocGia;
