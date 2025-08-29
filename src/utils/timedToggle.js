export default async function timedToggle(ref, trueValue, falseValue) {
  ref.value = trueValue
  await new Promise(resolve => setTimeout(resolve, 3000))
  ref.value = falseValue
}
