const info = (req, res) => {
  return res.json({
    success: "true",
    message: "My server is LIVE",
    error: "",
    data: ""
  })
}

module.exports = info;
