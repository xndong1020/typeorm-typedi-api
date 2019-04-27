import { Repository, getManager } from 'typeorm'
import { User } from '../entity/User'

export class UserService {
  private repository: Repository<User>

  constructor() {
    this.repository = getManager().getRepository(User)
  }

  list(): Promise<User[]> {
    return this.repository.find()
    // return this.repository.createQueryBuilder('User').getMany()
  }

  byId(id: string): Promise<User> {
    return this.repository.findOne(id)
    // return this.repository
    //   .createQueryBuilder('User')
    //   .where('id=:id')
    //   .setParameters({ id: id })
    //   .getOne()
  }

  create(user: User): Promise<User> {
    const newUser = this.repository.create(user)
    return this.repository.save(newUser)
  }

  update(id: string, user: User) {
    return this.repository.update(id, user)
  }

  del(id: string) {
    return this.repository.delete(id)
  }
}
