import { run } from "../../../utils/database.utils.js"

export const getCurrentUser = async (request, response) => {

    const { id }  = request.session

    if (id !== null) {
        await run('SELECT * FROM users WHERE id = ?', [ id ]).then(users =>{

            response.status(200).json({ success: true, message: '', data:  users[0] })
        })
    }


}