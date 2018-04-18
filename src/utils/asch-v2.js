import AschJS from 'asch-js-v2'
// TODO 替换为更新后的 asch-js 库
// const exFunc = (conf)=>{
//   let {type,fee=10000000,args=[],secondSecret=''}
//   return AschJS.transaction.createTransactionEx({
//     type,
//     fee,
//     args,
//     secret,
//     secondSecret
//   })
// }

// TODO
const convertSecondPwd = pwd => {
  // let key = pwd
  // let keyPair = AschJS.crypto.getKeys(key)
  // return keyPair.publicKey
  return pwd
}

const asch = {
  // 转账 XAS  TODO
  transferXAS: (amount, recipientId, message, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 1,
      fee: 10000000,
      args: [amount, recipientId],
      secret,
      secondSecret: convertSecondPwd(secondPwd),
      message
    })
  },
  // 设置昵称
  setName: (name, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 2,
      fee: 10000000,
      args: [name],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 设置二级密码
  setsecondPassword: (secondPwd, secret) => {
    return AschJS.transaction.createTransactionEx({
      type: 3,
      fee: 10000000,
      args: [convertSecondPwd(secondPwd)],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 锁仓
  setLock: (height, amount, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 4,
      fee: 10000000,
      args: [height, amount],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 解锁
  unlock: (secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 5,
      fee: 10000000,
      args: [],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 设置多签账户
  setMultiAccount: (secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 6,
      fee: 10000000,
      args: [],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 注册为代理人
  registerAgent: (secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 7,
      fee: 10000000,
      args: [],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 设置投票代理人
  setAgent: (agent, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 8,
      fee: 10000000,
      args: [agent],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 取消投票代理
  repealAgent: (agent, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 9,
      fee: 10000000,
      args: [agent],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 注册为受托人
  registerDelegate: (secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 10,
      fee: 10000000,
      args: [],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 受托人投票
  voteDelegate: (delegates, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 11,
      fee: 10000000,
      args: [delegates],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },

  // 撤销受托人投票
  cleanVote: (delegates, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 12,
      fee: 10000000,
      args: [delegates],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },

  // 注册发行商 TODO
  registerIssuer: (name, desc, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 100,
      fee: 10000000,
      args: [name, desc],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 注册资产 TODO
  registerAsset: (symbol, desc, maximum, precision, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 101,
      fee: 10000000,
      args: [symbol, desc, maximum, precision],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 发行资产
  issueAsset: (symbol, amount, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 101,
      fee: 10000000,
      args: [symbol, amount],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 资产转账
  transferAsset: (symbol, amount, recipientId, message, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 103,
      fee: 10000000,
      args: [symbol, amount, recipientId],
      secret,
      secondSecret: convertSecondPwd(secondPwd),
      message
    })
  },
  // 注册 dapp
  registerDapp: (
    name,
    desc,
    tags,
    link,
    icon,
    category,
    delegates,
    nlockNumber,
    secret,
    secondPwd = ''
  ) => {
    return AschJS.transaction.createTransactionEx({
      type: 200,
      fee: 10000000,
      args: [name, desc, tags, link, icon, category, delegates, nlockNumber],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 更新 dapp 记账人
  updateBooker: (dappId, origin, key, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 201,
      fee: 10000000,
      args: [dappId, origin, key],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 添加 dapp 记账人
  addBooker: (dappId, key, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 202,
      fee: 10000000,
      args: [dappId, key],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 删除 dapp 记账人
  deleteBooker: (dappId, key, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 203,
      fee: 10000000,
      args: [dappId, key],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // dapp 充值
  depositDapp: (dappId, currency, amount, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 204,
      fee: 10000000,
      args: [dappId, currency, amount],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // dapp 提现 TODO  参数问题
  withdrawDapp: (dappId, recipient, amount, wid, signatures, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 205,
      fee: 10000000,
      args: [dappId, recipient, amount, wid, signatures],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 发起提案
  createProposal: (title, desc, topic, content, endHeight, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 300,
      fee: 10000000,
      args: [title, desc, topic, content, endHeight],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 对提案投票
  voteProposal: (pid, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 301,
      fee: 10000000,
      args: [pid],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 激活提案
  activateProposal: (pid, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 302,
      fee: 10000000,
      args: [pid],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 网关注册候选人
  registerGateway: (gateway, publicKey, desc, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 401,
      fee: 10000000,
      args: [gateway, publicKey, desc],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 网关开户
  openGatewayAccount: (gateway, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 402,
      fee: 10000000,
      args: [gateway],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 网关充值
  depositGateway: (address, currency, amount, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 402,
      fee: 10000000,
      args: [address, currency, amount],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  },
  // 网关提现
  withdrawGateway: (address, currency, amount, secret, secondPwd = '') => {
    return AschJS.transaction.createTransactionEx({
      type: 403,
      fee: 10000000,
      args: [address, currency, amount],
      secret,
      secondSecret: convertSecondPwd(secondPwd)
    })
  }
}
export default asch
