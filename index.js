const express = require("express");
const userRouter = require("./routes/user.routes");

//получаем порт из окружения, либо 8080
const PORT = process.env.PORT || 8080;
//создаём сервер
const app = express();

app.use(express.json());
app.use("/api", userRouter);
//сервер слушает порт
app.listen(PORT, () => console.log(`server started on ${PORT}`));
