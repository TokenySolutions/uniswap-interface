import { getCreate2Address } from '@ethersproject/address'
import { keccak256, pack } from '@ethersproject/solidity'
import { Token } from '@uniswap/sdk-core'

export function computePairAddressCustom({
  factoryAddress,
  tokenA,
  tokenB,
}: {
  factoryAddress: string
  tokenA: Token
  tokenB: Token
}) {
  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA] // does safety checks
  return getCreate2Address(
    factoryAddress,
    keccak256(['bytes'], [pack(['address', 'address'], [token0.address, token1.address])]),
    '0x1892ee6b3b8f653471529d0b06a772bdc5588bb0b15607cb427c8148f70004a9'
  )
}
