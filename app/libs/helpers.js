module.exports = {
  getFileExtension (fname) {
    return fname.substr((~-fname.lastIndexOf('.') >>> 0) + 2)
  }
}
