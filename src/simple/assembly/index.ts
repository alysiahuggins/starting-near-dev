import { storage, Context } from "near-sdk-as"

// return the string 'hello world'
export function helloWorld(): string {
  return 'hello world alysia'
}

// read the given key from account (contract) storage
export function read(key: string): string {
  if (storage.hasKey(key)) {
    return `✅ Key [ ${key} ] has value [ ${storage.getString(key)!} ]`
  } else {
    return `🚫 Key [ ${key} ] not found in storage.`
  }

}
// read the given key from account (contract) storage
export function check(key: string): string {
    if (storage.hasKey(key)) {
      return `✅ Key [ ${key} ] has value [ ${storage.getString(key)!} ]`
    } else {
      return `🚫 Key [ ${key} ] not found in storage.`
    }

}

// write the given value at the given key to account (contract) storage
export function write(key: string, value: string): string {
  storage.set(key, value)
  return `✅ Data saved. ( ${storageReport()} )`
}

// write the given value at the given key to account (contract) storage
export function claim(key: string, value: string): string {
  if (storage.hasKey(key)) {
    return `✅ Key [ ${key} ] has already taken by [ ${storage.getString(key)!} ]`
  } else {
    storage.set(key, value)
    return `✅ Data saved. ( ${storageReport()} )`
  }
  
}

// private helper method used by read() and write() above
function storageReport(): string {
  return `storage [ ${Context.storageUsage} bytes ]`
}
