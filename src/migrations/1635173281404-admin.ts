import { getDb } from '../migrations-utils/db';
import { User } from '../user/schemas/user.schema'
import { Role } from '../common/enums/role.enum';

export const up = async () => {
   const db = await getDb();
   const user = new User();
   user.name = "admin"
   user.password = "admin"
   user.roles = [Role.ADMIN]
   db.collection('users').insertOne(user)
   /*
       Code your update script here!
    */
};

export const down = async () => {
   const db = await getDb();
   /*
       Code you downgrade script here!
    */
};
