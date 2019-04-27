import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { User } from './User'

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  name: string

  @Column()
  age: number

  @Column()
  sex: string

  @ManyToOne(type => User, user => user.pets)
  @JoinColumn({ name: 'userId' })
  owner: User
}
