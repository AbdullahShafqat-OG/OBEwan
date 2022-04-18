import React, { useEffect, useState } from "react";

const Plo = (props) => (
    <tr>
        <td>{props.plo.name}</td>
        <td>{props.plo.label}</td>
        <td>{props.plo.statement}</td>
        <td>{props.plo.degree}</td>
    </tr>
);

export default function PloList() {
    const [plos, setPlos] = useState([]);

    useEffect(() => {
        async function getPlos() {
            const response = await fetch('http://localhost:3000/api/plos/');

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const plos = await response.json();
            setPlos(plos);
        }

        getPlos();

        return;
    }, [plos.length]);

    function ploList() {
        return plos.map((plo) => {
            return (
                <Plo plo={plo} />
            );
        });
    }

    return (
        <div>
            <h3>PLO List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Label</th>
                        <th>Statement</th>
                        <th>Degree</th>
                    </tr>
                </thead>
                <tbody>{ploList()}</tbody>
            </table>
        </div>
    );
}

