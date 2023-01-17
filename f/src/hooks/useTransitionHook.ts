import { useInView } from "react-intersection-observer"

const useTransitionHook = (object?: useTransitionFields) => {
  const { ref, inView } = useInView({
    triggerOnce: object?.triggerOnce === undefined,
    delay: object?.delay || 0,
    trackVisibility: Boolean(object?.delay),
  })
  const styleTransition = { transition: "1s ease", transform: inView ? "translateY(0)" : "translateY(25px)", opacity: inView ? "1" : "0" }
  return { ref, styleTransition }
}

export default useTransitionHook
