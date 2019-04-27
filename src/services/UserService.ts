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
    // return this.repository.find({ relations: ['pets'] })
    return this.repository
      .createQueryBuilder('User')
      .leftJoinAndSelect('User.pets', 'pets')
      .getMany()
  }

  byId(id: string): Promise<User> {
    // return this.repository.findOne(id, { relations: ['pets'] })
    return this.repository
      .createQueryBuilder('User')
      .leftJoinAndSelect('User.pets', 'pets')
      .where('User.id=:id')
      .setParameters({ id })
      .getOne()
  }

  create(user: User): Promise<User> {
    const newUser = this.repository.create(user)
    return this.repository.save(newUser)
  }

  async update(id: string, user: User) {
    // return this.repository.update(id, user)
    const userInDb = await this.repository.findOne(id)

    Object.keys(user).forEach(key => {
      userInDb[key] = user[key]
    })

    this.repository.save(userInDb)
  }

  del(id: string) {
    return this.repository.delete(id)
  }
}
