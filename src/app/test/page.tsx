export default function Index() {
    const testVar = process.env.TEST_VAR;

    return (
        <div>Index: {testVar}</div>
    )
}