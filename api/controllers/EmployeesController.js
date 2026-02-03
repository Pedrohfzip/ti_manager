import { db, loadModels } from "../database/models/index.js";


const EmployeesController = {
    async getAllEmployees(req, res) {
        try {
            const employees = await db.Employees.findAll();
            return res.status(200).json(employees);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
}



export default EmployeesController;