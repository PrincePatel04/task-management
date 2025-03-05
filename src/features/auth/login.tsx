import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Button, Card } from "flowbite-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useAppDispatch } from "../../app/hooks";
import CustomInput from "../../shared/components/input";
import { initialValues, validationSchema } from "./auth.constant";
import { LoginFormValues } from "./auth.interface";
import { setAuthData } from "./authSlice";

const Login: FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<LoginFormValues>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
        mode: "onChange",
    });

    const handleLogin = async (values: LoginFormValues) => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                "https://dummyjson.com/auth/login",
                values
            );

            toast.success(`Welcome ${data.firstName} ${data.lastName}`);
            dispatch(setAuthData(data));
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Incorrect Username or Password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Card className="w-full max-w-xs bg-white">
                <h3 className="text-xl font-bold text-center">Login</h3>
                <div className="flex flex-col w-full gap-4">
                    <CustomInput<LoginFormValues>
                        label="Username"
                        name="username"
                        control={control}
                        error={errors.username?.message}
                    />
                    <CustomInput<LoginFormValues>
                        label="Password"
                        name="password"
                        control={control}
                        error={errors.password?.message}
                        type="password"
                    />
                    <Button
                        disabled={isLoading}
                        onClick={handleSubmit(handleLogin)}
                    >
                        Login
                    </Button>
                </div>
            </Card>
        </>
    );
};

export default Login;
