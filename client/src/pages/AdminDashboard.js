import React, { useEffect, useState } from "react";

const Plo = (props) => (
    <tr>
        <td>{props.plo.name}</td>
        <td>{props.plo.label}</td>
        <td>{props.plo.statement}</td>
        <td>{props.plo.degree}</td>
    </tr>
);

const Course = (props) => (
    <tr>
        <td>{props.course.name}</td>
        <td>{props.course.instructors}</td>
        <td>button or cascading view for instructors</td>
    </tr>
);

export default function PloList() {
    const [plos, setPlos] = useState([]);
    const [courses, setCourses] = useState([]);

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
                <Plo 
                    plo={plo} 
                    key={plo._id}
                />
            );
        });
    }

    useEffect(() => {
        async function getCourses() {
            const response = await fetch('http://localhost:3000/api/courses/');

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const courses = await response.json();
            setCourses(courses);
        }

        getCourses();

        return;
    }, [courses.length]);

    function courseList() {
        return courses.map((course) => {
            return (
                <Course 
                    course={course} 
                    key={course._id}
                />
            );
        });
    }

    function testFunction() {
        window.location.href = "/dashboard/admin/createPlo";
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h3>PLO List</h3>
            <table border="1px">
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
            <h3>Courses</h3>
            <table border="1px">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Instructors</th>
                        <th>Mapping</th>
                    </tr>
                </thead>
                <tbody>{courseList()}</tbody>
            </table>
            <br />
            <button onClick={() => {testFunction()}}>Create PLO</button>
        </div>
    );
}

