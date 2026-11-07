function Card({ title, value, icon, description }) {
  // props r title,value,icon,description helps to send data from parent to child
  // making card componet and passing value in <Card/> as much as w ewant
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between ">

        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h3 className="mt-2 text-2xl font-bold text-slate-800">
            {value}
          </h3>

          <p className="mt-2 text-xs text-slate-500">
            {description}
          </p>

        </div>

        <div className="rounded-xl bg-green-100 p-3 text-green-600">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default Card;