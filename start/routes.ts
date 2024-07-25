/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from "@adonisjs/core/services/router";
import { middleware } from "./kernel.js";
const AuthController = () => import("#controllers/auth_controller");
const ThreadController = () => import("#controllers/thread_controller");
const RepliesController = () => import("#controllers/replies_controller");

router.get("/", async () => {
	return {
		hello: "world",
	};
});

router
	.group(() => {
		router
			.group(() => {
				router.post("/register", [AuthController, "register"]).as("register");
				router.post("/login", [AuthController, "login"]).as("login");
				router
					.delete("/logout", [AuthController, "logout"])
					.as("logout")
					.use(middleware.auth());

				router
					.get("/me", [AuthController, "me"])
					.as("me")
					.use(middleware.auth());
			})
			.prefix("/auth")
			.as("auth");

		router.get("/threads", [ThreadController, "index"]).as("threads.index");
		router
			.post("/threads", [ThreadController, "store"])
			.as("threads.store")
			.use(middleware.auth());
		router.get("/threads/:id", [ThreadController, "show"]).as("threads.show");
		router
			.put("/threads/:id", [ThreadController, "update"])
			.as("threads.update")
			.use(middleware.auth());
		router
			.delete("/threads/:id", [ThreadController, "destroy"])
			.as("threads.destroy")
			.use(middleware.auth());

		router
			.get("/threads/:threadId/replies", [RepliesController, "index"])
			.as("replies.index");

		router
			.post("/threads/:threadId/replies", [RepliesController, "store"])
			.as("replies.store")
			.use(middleware.auth());
		router
			.get("/threads/:threadId/replies/:id", [RepliesController, "show"])
			.as("replies.show");

		router
			.put("/threads/:threadId/replies/:id", [RepliesController, "update"])
			.as("replies.update")
			.use(middleware.auth());
		router
			.delete("/threads/:threadId/replies/:id", [RepliesController, "destroy"])
			.as("replies.destroy")
			.use(middleware.auth());
	})
	.prefix("/api");
