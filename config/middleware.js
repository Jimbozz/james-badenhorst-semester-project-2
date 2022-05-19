module.exports = {
  settings: {
    timer: {
      enabled: true,
    },
    parser: {
      enabled: true,
      multipart: true,
      formidable: {
        maxFileSize: 200 * 1024 * 1024, // Defaults to 200mb
      },
    },
  },
};
