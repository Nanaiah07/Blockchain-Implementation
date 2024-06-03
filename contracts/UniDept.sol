// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UniDept {
    struct Department {
        string name;
        string hodName;
        uint numberOfProfessors;
        uint numberOfAssociateProfessors;
        string teachers;
        uint numberOfLabs;
        uint numberOfClassrooms;
        uint totalNumberOfStudents;
        uint numberOfCoursesOffered;
    }

    event DepartmentAdded(
        uint departmentId,
        string name,
        string hodName,
        uint numberOfProfessors,
        uint numberOfAssociateProfessors,
        string teachers,
        uint numberOfLabs,
        uint numberOfClassrooms,
        uint totalNumberOfStudents,
        uint numberOfCoursesOffered
    );

    mapping(uint => Department) public departments;
    mapping(string => uint) private departmentNameToId;
    uint public totalDepartments;

    constructor() {
        totalDepartments = 0;
    }

    function addDepartment(
        string memory name,
        string memory hodName,
        uint numberOfProfessors,
        uint numberOfAssociateProfessors,
        string memory teachers,
        uint numberOfLabs,
        uint numberOfClassrooms,
        uint totalNumberOfStudents,
        uint numberOfCoursesOffered
    ) public {
        totalDepartments++;
        departments[totalDepartments] = Department({
            name: name,
            hodName: hodName,
            numberOfProfessors: numberOfProfessors,
            numberOfAssociateProfessors: numberOfAssociateProfessors,
            teachers: teachers,
            numberOfLabs: numberOfLabs,
            numberOfClassrooms: numberOfClassrooms,
            totalNumberOfStudents: totalNumberOfStudents,
            numberOfCoursesOffered: numberOfCoursesOffered
        });

        departmentNameToId[name] = totalDepartments;

        emit DepartmentAdded(
            totalDepartments,
            name,
            hodName,
            numberOfProfessors,
            numberOfAssociateProfessors,
            teachers,
            numberOfLabs,
            numberOfClassrooms,
            totalNumberOfStudents,
            numberOfCoursesOffered
        );
    }

    function updateTeachers(
        string memory departmentName,
        string memory newTeachers
    ) public {
        uint departmentId = departmentNameToId[departmentName];
        require(departmentId != 0, "Department does not exist");
        departments[departmentId].teachers = newTeachers;
    }

    function getDepartmentInfo(
        string memory departmentName
    )
        public
        view
        returns (
            string memory name,
            string memory hodName,
            uint numberOfProfessors,
            uint numberOfAssociateProfessors,
            string memory teachers,
            uint numberOfLabs,
            uint numberOfClassrooms,
            uint totalNumberOfStudents,
            uint numberOfCoursesOffered
        )
    {
        uint departmentId = departmentNameToId[departmentName];
        require(departmentId != 0, "Department does not exist");

        Department memory dept = departments[departmentId];
        return (
            dept.name,
            dept.hodName,
            dept.numberOfProfessors,
            dept.numberOfAssociateProfessors,
            dept.teachers,
            dept.numberOfLabs,
            dept.numberOfClassrooms,
            dept.totalNumberOfStudents,
            dept.numberOfCoursesOffered
        );
    }
}
