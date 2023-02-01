const [dateCheck, setDateCheck] = useState(false) // default value can be anything you want

useEffect(() => {
    if (todoDate <= currentDate) {
        setTimeout(() => setDateCheck(true), 1000)
            , [dateCheck]
    }
})