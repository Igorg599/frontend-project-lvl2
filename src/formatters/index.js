import stylish from "./stylish.js"

export default (getDiff, format = "stylish") => {
  switch (format) {
    case "stylish":
      return stylish(getDiff)
    default:
      throw new Error(`Формат не поддерживается - ${format}`)
  }
}
