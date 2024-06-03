async function fetchContractABI() {
    const response = await fetch('ABI.json');
    const data = await response.json();
    return data.abi; // Return only the ABI array
}

async function initialize() {
    if (!window.ethereum) {
        alert("MetaMask is not installed. Please install MetaMask to interact with this website.");
        return;
    }

    try {
        // Request permission to access user's MetaMask accounts
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = "0x874449393707fD122B4C7B3EE8d2024Bd371FdA2"; // Replace with your actual contract address
        const contractABI = await fetchContractABI();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        // Add Department
        document.getElementById('addDepartmentForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const name = document.getElementById('deptName').value;
            const hodName = document.getElementById('hodName').value;
            const numberOfProfessors = document.getElementById('numProfessors').value;
            const numberOfAssociateProfessors = document.getElementById('numAssociateProfessors').value;
            const teachers = document.getElementById('teachers').value;
            const numberOfLabs = document.getElementById('numLabs').value;
            const numberOfClassrooms = document.getElementById('numClassrooms').value;
            const totalNumberOfStudents = document.getElementById('totalStudents').value;
            const numberOfCoursesOffered = document.getElementById('numCoursesOffered').value;

            try {
                const tx = await contract.addDepartment(
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
                await tx.wait();
                alert("Department added successfully!");
            } catch (error) {
                console.error("Error:", error);
                alert("Error adding department. See console for details.");
            }
        });

        // Get Department Info
        document.getElementById('getDepartmentInfoForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const departmentName = document.getElementById('getDeptName').value;

            try {
                const departmentInfo = await contract.getDepartmentInfo(departmentName);
                const formattedInfo = `
                    Name: ${departmentInfo[0]} <br>
                    HOD Name: ${departmentInfo[1]} <br>
                    Number of Professors: ${departmentInfo[2]} <br>
                    Number of Associate Professors: ${departmentInfo[3]} <br>
                    Teachers: ${departmentInfo[4]} <br>
                    Number of Labs: ${departmentInfo[5]} <br>
                    Number of Classrooms: ${departmentInfo[6]} <br>
                    Total Number of Students: ${departmentInfo[7]} <br>
                    Number of Courses Offered: ${departmentInfo[8]}
                `;
                document.getElementById('departmentDetails').innerHTML = formattedInfo;
            } catch (error) {
                console.error("Error:", error);
                alert("Error fetching department info. See console for details.");
            }
        });

        // Show All Departments
        document.getElementById('showAllDepartments').addEventListener('click', async () => {
            try {
                let details = '';
                const totalDepartments = await contract.totalDepartments();
                for (let i = 1; i <= totalDepartments; i++) {
                    const dept = await contract.departments(i);
                    details += `
                        Department ID: ${i} <br>
                        Name: ${dept.name} <br>
                        HOD Name: ${dept.hodName} <br>
                        Number of Professors: ${dept.numberOfProfessors} <br>
                        Number of Associate Professors: ${dept.numberOfAssociateProfessors} <br>
                        Teachers: ${dept.teachers} <br>
                        Number of Labs: ${dept.numberOfLabs} <br>
                        Number of Classrooms: ${dept.numberOfClassrooms} <br>
                        Total Number of Students: ${dept.totalNumberOfStudents} <br>
                        Number of Courses Offered: ${dept.numberOfCoursesOffered} <br><br>
                    `;
                }
                document.getElementById('departmentDetails').innerHTML = details;
            } catch (error) {
                console.error("Error:", error);
                alert("Error fetching all departments. See console for details.");
            }
        });

    } catch (error) {
        console.error("Error:", error);
        alert("Initialization error. See console for details.");
    }
}

// Initialize the app
initialize();
