import {
    Button,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label
} from "reactstrap";

import {
    FormInput
} from "../interfaces";

interface Props<T> {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    data: T;
    setData: React.Dispatch<React.SetStateAction<T>>;
    buttonText: string;
    inputs: FormInput<T>[];
}

const AppForm = <T,>({
    onSubmit,
    data,
    setData,
    buttonText,
    inputs
}: Props<T>) => {
    return (
        <Form onSubmit={onSubmit}>
            {inputs.map((input) => (
                <FormGroup key={String(input.name)}>
                    <Label for={String(input.name)}>{input.label}</Label>
                    <Input
                        type={input.type}
                        name={String(input.name)}
                        id={String(input.name)}
                        value={String(data[input.name])}
                        onChange={(e) => setData({ ...data, [input.name]: e.target.value })}
                        invalid={input.isInvalid}
                        required={input.required}
                    />
                    {input.errorMessage && <FormFeedback>{input.errorMessage}</FormFeedback>}
                </FormGroup>
            ))}

            <Button>{buttonText}</Button>
        </Form>
    );
}

export default AppForm;