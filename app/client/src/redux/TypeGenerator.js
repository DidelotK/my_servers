export default class TypeGenerator {
  static success(type) {
    return `${type}_SUCCESS`;
  }
  static failure(type) {
    return `${type}_FAILURE`;
  }
  static retry(type) {
    return `${type}_RETRY`;
  }
}
