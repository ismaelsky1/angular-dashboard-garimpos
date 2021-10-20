<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use eloquentFilter\QueryFilter\ModelFilters\ModelFilters;
use Illuminate\Http\Response;
use App\Services\Contracts\IProfileJobService;

class ProfileJobController extends Controller
{

    private $service;

    public function __construct(IProfileJobService $service)
    {
        $this->middleware('cors');
        $this->middleware('jwt.auth');
        $this->service = $service;
    }

    public function index(ModelFilters $modelFilters)
    {
        $obj = $this->service->findAll($modelFilters);
        return response()->json($obj, Response::HTTP_OK);
    }

    public function show($id)
    {
        if ($obj = $this->service->findById($id))
            return $obj;

        return response()->json(['message'   => 'Nenhum registro encontrado'], Response::HTTP_NOT_FOUND);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'company_id'  => 'required',
            'title' => 'required',
            'salary_id' => 'required',
            'work_hour_id' => 'required',
            'gender' => 'required',
            'status' => 'required',
        ]);

        if($validator->fails())
            return response()->json(['success' => false, 'message' => $validator->errors()->all()], Response::HTTP_BAD_REQUEST);

        $obj = $this->service->add($data);
        return response()->json($obj, Response::HTTP_OK);
    }

    public function update(Request $request, $id)
    {
        if(!$obj = $this->service->update($id, $request->all())) {
            return response()->json([
                'message'   => 'Nenhum registro encontrado'
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json($obj, Response::HTTP_OK);
    }

    public function destroy($id)
    {
        if(!$this->service->remove($id)) {
            return response()->json([
                'message'   => 'Nenhum registro encontrado'
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json(['message' => 'Registro removido com sucesso!'], Response::HTTP_OK);
    }
}
