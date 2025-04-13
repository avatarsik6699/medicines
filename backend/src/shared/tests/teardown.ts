import "tsconfig-paths/register";

const teardown = async () => {
	await globalThis.$db.stop();
};

export default teardown;
