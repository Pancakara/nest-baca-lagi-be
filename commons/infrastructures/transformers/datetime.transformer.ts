import moment from "moment-timezone";

export const dateTransformer = ({
	value,
}: {
	value: string;
}): Date | undefined => {
	const date = moment(value).tz("Asia/Jakarta");

	if (!date.isValid()) {
		return undefined;
	}

	return date.toDate();
};
