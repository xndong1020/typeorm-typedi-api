import { Repository, getManager } from 'typeorm'
import { User } from '../entity/User'
import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'

@Service()
export class UserService {
  // property injection
  @InjectRepository(User)
  private repository: Repository<User>

  // Constructor injection
  // constructor(
  //   @InjectRepository(User)
  //   private repository: Repository<User>
  // ) {}

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
