let buildMakeUser = function (userValidator) {
  return ({ email, password } = {}) => {
    let { error } = userValidator({ email, password })
    if (error) throw new Error(error)

    return {
      getEmail: () => password,
      getPassword: () => password
    }
  }
}

module.exports = buildMakeUser
