import {
    InputHTMLAttributes,
    useState,
    forwardRef,
    ForwardedRef,
} from 'react'
import clsx from 'clsx'
import s from './input.module.scss'
import { Eye } from './icons/Eye'
import { EyeOff } from './icons/EyeOff'

type InputType = 'text' | 'email' | 'password'

type InputProps = {
    label?: string
    error?: string
    iconRight?: React.ReactNode
    type?: InputType
    fullWidth?: boolean // Используется как флаг "компактного" стиля
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            type = 'text',
            iconRight,
            className,
            value,
            placeholder,
            fullWidth,
            ...rest
        },
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        const [showPassword, setShowPassword] = useState(false)

        const isPassword = type === 'password'
        const isPasswordEmpty = isPassword && (value === '' || value === undefined)

        const effectivePlaceholder: string | undefined = isPasswordEmpty
            ? '••••••••'
            : placeholder

        const inputType = isPassword
            ? showPassword
                ? 'text'
                : 'password'
            : type

        const togglePasswordVisibility = () => setShowPassword((prev) => !prev)

        const renderRightIcon = () => {
            if (isPassword) {
                return (
                    <button
                        type="button"
                        className={s.iconButton}
                        onClick={togglePasswordVisibility}
                        tabIndex={-1}
                        aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                    >
                        {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                )
            }

            return iconRight ? (
                <div className={s.iconWrapper}>{iconRight}</div>
            ) : null
        }

        return (
            <div className={clsx(s.wrapper, className)}>
                {label && <label className={s.label}>{label}</label>}

                <div className={clsx(s.inputContainer, fullWidth && s.compact)}>
                    <input
                        type={inputType}
                        ref={ref}
                        className={clsx(s.input, error && s.error)}
                        value={value}
                        placeholder={effectivePlaceholder}
                        {...rest}
                    />
                    {renderRightIcon()}
                </div>

                {error && <span className={s.errorText}>{error}</span>}
            </div>
        )
    }
)

Input.displayName = 'Input'

