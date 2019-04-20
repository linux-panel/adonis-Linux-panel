'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique().comment('用户登录凭据')
      table.integer('sex').defaultTo(0).comment('0:男,1:女')
      table.string('email', 254).notNullable().unique().comment('用户邮箱,保留')
      table.string('phone').defaultTo('').comment('用户手机')
      table.string('password', 60).notNullable()
      table.integer('parent_id').defaultTo(0).notNullable().comment('归属导师,默认为0,就是导师自身')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
