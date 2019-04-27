import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  BeforeInsert,
  AfterLoad,
  OneToMany
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Pet } from './Pet';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  name: string

  @Column({
    unique: true
  })
  email: string

  @Column()
  password: string

  @OneToMany(type => Pet, pet => pet.owner)
  pets: Pet[]

  private tempPassword: string

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async encryptPassword(): Promise<void> {
    if (this.tempPassword !== this.password) {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(this.password, salt)
      this.password = hash
    }
  }
}
